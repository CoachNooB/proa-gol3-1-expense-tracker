package services

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type Task struct {
	ID       string `json:"id,omitempty"`
	Task     string `json:"task" binding:"required"`
	Assignee string `json:"assignee" binding:"required"`
	Done     bool   `json:"done"`
	Date     string `json:"date" binding:"required"`
}

var tasks []Task

func GetTasks(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, gin.H{"message": "Success", "tasks": tasks})
	return
}

func CreateTask(c *gin.Context) {
	var newTask Task
	if err := c.ShouldBindJSON(&newTask); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	newTask.ID = uuid.New().String()
	tasks = append(tasks, newTask)
	c.IndentedJSON(http.StatusCreated, gin.H{"message": "Task Added", "tasks": tasks})
	return
}

func DeleteTaskById(c *gin.Context) {
	id := c.Param("id")
	index, found := taskById(id)
	if !found {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Cannot Find Task"})
		return
	}
	tasks = append(tasks[:index], tasks[index+1:]...)
	return
}

func UpdateTaskById(c *gin.Context) {
	id := c.Param("id")
	index, found := taskById(id)
	if !found {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Cannot Find Task"})
		return
	}
	var newTask Task
	if err := c.Bind(&newTask); err != nil {
		return
	}
	currentData := tasks[index]

	// Delete Current Task
	tasks = append(tasks[:index], tasks[index+1:]...)
	newTask.ID = currentData.ID
	tasks = append(tasks, newTask)
	c.IndentedJSON(http.StatusCreated, gin.H{"message": "Task Updated"})
	return

}

func taskById(id string) (int, bool) {
	for i, rec := range tasks {
		if rec.ID == id {
			return i, true
		}
	}
	return 0, false
}
