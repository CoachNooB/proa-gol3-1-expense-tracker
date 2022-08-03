package main

import (
	"example/proa-gol3-1-expense-tracker/backend/services"

	// "net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	app := gin.Default()
	app.GET("/api/v1/expenses", services.GetExpenses)
	app.POST("/api/v1/expenses", services.CreateRecord)
	app.PUT("/api/v1/expenses/:id", services.UpdateRecordById)
	app.DELETE("/api/v1/expenses/:id", services.DeleteRecordById)
	app.Run("localhost:5000")
}
