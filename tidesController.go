package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func getTides(lat string, lon string) (*Tides, error) {
	key := os.Getenv("WORLD_TIDES_KEY")

	url := fmt.Sprintf("https://www.worldtides.info/api?extremes&lat=%s&lon=%s&key=%s", lat, lon, key)
	log.Println(url)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	// req.Header.Set("Accept-Encoding", "gzip")
	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	defer res.Body.Close()
	var tides *Tides
	err = json.Unmarshal(body, &tides)
	if err != nil {
		return nil, err
	}

	fmt.Println(tides.Copyright)
	return tides, nil
}
