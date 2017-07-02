package main

import (
	"fmt"
	"time"
)

func timeToDay(dt int) string {
	layout := "Mon"
	t := int64(dt)
	f := time.Unix(t, 0).Format(layout)
	return f
}

func timeToHour(dt int) string {
	layout := "Mon 15:00"
	t := int64(dt)
	f := time.Unix(t, 0).Format(layout)
	return f
}

func typeToImg(tp string) string {
	if tp == "High" {
		return "arrow-up-right.svg"
	} else {
		return "arrow-down-right.svg"
	}
}

func roundHeight(f float64) string {
	return fmt.Sprintf("%0.2f", f)
}
