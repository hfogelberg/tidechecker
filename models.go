package main

type Tides struct {
	Station			string 	`json:"station"`
	Status      int     `json:"status"`
	CallCount   int     `json:"callCount"`
	RequestLat  string  `json:"requestLat"`
	RequestLon  string  `json:"requestLon"`
	ResponseLat float64 `json:"responseLat"`
	ResponseLon float64 `json:"responseLon"`
	Atlas       string  `json:"atlas"`
	Copyright   string  `json:"copyright"`
	Extremes    []struct {
		Dt     int     `json:"dt"`
		Date   string  `json:"date"`
		Height float64 `json:"height"`
		Type   string  `json:"type"`
	} `json:"extremes"`
}
