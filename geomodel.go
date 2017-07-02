package main

type (
	Geolocation struct {
		Lat  string
		Lon  string
		Name string
	}

	Response struct {
		Status  string   `json:"status"`
		Results []Result `json:"results"`
	}

	Result struct {
		Types             []string           `json:"types"`
		FormattedAddress  string             `json:"formatted_address"`
		AddressComponents []AddressComponent `json:"address_components"`
	}

	AddressComponent struct {
		LongName  string   `json:"long_name"`
		ShortName string   `json:"short_name"`
		Types     []string `json:"types"`
	}
)
