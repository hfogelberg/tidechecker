package main

type Tides struct {
	Station     string  `json:"station"`
	CallCount   int     `json:"callCount"`
	Copyright   string  `json:"copyright"`
	RequestLat  float64 `json:"requestLat"`
	RequestLon  float64 `json:"requestLon"`
	ResponseLat float64 `json:"responseLat"`
	ResponseLon float64 `json:"responseLon"`
	Atlas       string  `json:"atlas"`
	Extremes    []struct {
		Dt     int     `json:"dt"`
		Date   string  `json:"date"`
		Height float64 `json:"height"`
		Type   string  `json:"type"`
	} `json:"extremes"`
}
