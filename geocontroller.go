package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

func reverseGeocode(lat string, lon string) (string, error) {
	var name string
	key := os.Getenv("GOOGLE_MAPS_KEY")
	url := fmt.Sprintf("https://maps.googleapis.com/maps/api/geocode/json?latlng=%s,%s&key=%s", lat, lon, key)

	resp, err := http.Get(url)
	if err != nil {
		return "", err
	}

	defer resp.Body.Close()

	var g = new(Response)
	err = json.NewDecoder(resp.Body).Decode(g)

	if err != nil {
		return "", err
	}

	acs := g.Results[0].AddressComponents

	for _, ac := range acs {
		t := ac.Types[0]
		if t == "postal_town" {
			name = ac.ShortName
		}
		if t == "locality" && name == "" {
			name = ac.ShortName
		}
		if t == "administrative_area_level_1" && name == "" {
			name = ac.ShortName
		}
		if t == "administrative_area_level_2" && name == "" {
			name = ac.ShortName
		}
	}

	return name, nil
}
