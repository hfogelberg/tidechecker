package main

import (
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/urfave/negroni"
)

func main() {
	router := mux.NewRouter().StrictSlash(false)
	router.HandleFunc("/", indexHandler).Methods("GET")
	router.HandleFunc("/tides/{lat}/{lon}", tidesHandler).Methods("GET")
	router.HandleFunc("/about", aboutHandler).Methods("GET")
	router.HandleFunc("/contact", contactHandler).Methods("GET")
	router.HandleFunc("/favicon.ico", faviconHandler)

	mux := http.NewServeMux()
	mux.Handle("/", router)

	static := http.StripPrefix("/public/", http.FileServer(http.Dir("public")))
	router.PathPrefix("/public").Handler(static)

	n := negroni.Classic()
	n.UseHandler(mux)
	port := getEnv("PORT", ":80")
	http.ListenAndServe(port, n)
}

func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if len(value) == 0 {
		return defaultValue
	}
	return value
}
