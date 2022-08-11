package main

import (
	"example/proa-gol3-1-expense-tracker/backend/services"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	app := gin.Default()
	app.Use(cors.Default())
	// envErr := godotenv.Load()
	// if envErr != nil {
	// 	log.Fatal("Error Loading .env file")
	// }

	//port := os.Getenv("PORT")

	//Root
	app.GET("/", getRoot)

	// Expenses Route
	app.GET("/api/v1/expenses", services.GetExpenses)
	app.POST("/api/v1/expenses", services.CreateRecord)
	app.PUT("/api/v1/expenses/:id", services.UpdateRecordById)
	app.DELETE("/api/v1/expenses/:id", services.DeleteRecordById)

	// Tasks Route
	app.GET("/api/v1/tasks", services.GetTasks)
	app.POST("/api/v1/tasks", services.CreateTask)
	app.PUT("/api/v1/tasks/:id", services.UpdateTaskById)
	app.DELETE("/api/v1/tasks/:id", services.DeleteTaskById)

	app.Run()
}

func getRoot(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, gin.H{"message": "App Up and Running"})
	return
}
