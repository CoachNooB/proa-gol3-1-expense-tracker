package services

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type Expenses struct {
	ID          string `json:"id,omitempty"`
	Type        string `json:"type" binding:"required"`
	Amount      int    `json:"amount" binding:"required"`
	Description string `json:"description" binding:"required"`
	Date        string `json:"date" binding:"required"`
}

var balance int = 0
var records []Expenses

func GetExpenses(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, gin.H{"message": "Success", "records": records, "balance": balance})
	return
}

func CreateRecord(c *gin.Context) {
	var newRecord Expenses
	if err := c.ShouldBindJSON(&newRecord); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	newRecord.ID = uuid.New().String()
	calculateBalance(newRecord.Type, newRecord.Amount, &balance)
	records = append(records, newRecord)
	c.IndentedJSON(http.StatusCreated, gin.H{"message": "Record Added", "record": newRecord, "balance": balance})
	return
}

func DeleteRecordById(c *gin.Context) {
	id := c.Param("id")
	index, found := recordById(id)
	if !found {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Cannot Find Record"})
		return
	}
	if records[index].Type == "income" {
		balance -= records[index].Amount
	} else {
		balance += records[index].Amount
	}
	records = append(records[:index], records[index+1:]...)
	return
}

func UpdateRecordById(c *gin.Context) {
	id := c.Param("id")
	index, found := recordById(id)
	if !found {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Cannot Find Record"})
		return
	}
	var newRecord Expenses
	if err := c.Bind(&newRecord); err != nil {
		return
	}
	currentData := records[index]
	if currentData.Type == "expense" {
		balance += currentData.Amount
	} else {
		balance -= currentData.Amount
	}
	// Delete Current Record
	records = append(records[:index], records[index+1:]...)
	newRecord.ID = currentData.ID
	calculateBalance(newRecord.Type, newRecord.Amount, &balance)
	records = append(records, newRecord)
	c.IndentedJSON(http.StatusCreated, gin.H{"message": "Record Updated", "balance": balance})
	return

}

func recordById(id string) (int, bool) {
	for i, rec := range records {
		if rec.ID == id {
			return i, true
		}
	}
	return 0, false
}

func calculateBalance(recordType string, amount int, balancePtr *int) {
	if recordType == "expense" {
		*balancePtr -= amount
	}
	if recordType == "income" {
		*balancePtr += amount
	}
	return
}
