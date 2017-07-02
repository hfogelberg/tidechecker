package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

var fm = template.FuncMap{
	"timeToDay":   timeToDay,
	"timeToHour":  timeToHour,
	"typeToImg":   typeToImg,
	"roundHeight": roundHeight,
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	tpl, err := template.New("").ParseFiles("templates/index.html", "templates/layout.html")
	err = tpl.ExecuteTemplate(w, "layout", nil)
	if err != nil {
		log.Fatalln("Error serving index template ", err.Error())
		return
	}
}

func tidesHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	lon := vars["lon"]
	lat := vars["lat"]

	tides, err := getTides(lat, lon)
	if err != nil {
		log.Println(err)
	}

	fmt.Println(tides.Extremes)

	name, err := reverseGeocode(lat, lon)
	log.Println("*** NAME: " + name + " ***")
	tides.Station = name

	tpl, err := template.New("").Funcs(fm).ParseFiles("templates/tides.html", "templates/layout.html")
	err = tpl.ExecuteTemplate(w, "layout", tides)
	if err != nil {
		log.Fatalln(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func aboutHandler(w http.ResponseWriter, r *http.Request) {
	tpl, err := template.New("").ParseFiles("templates/about.html", "templates/layout.html")
	err = tpl.ExecuteTemplate(w, "layout", nil)
	if err != nil {
		log.Fatalln(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
