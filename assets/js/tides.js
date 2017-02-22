function getTides(lat, lon) {
  let key = "f1c67376-3200-41db-86c3-8334b6f81106"
  const url = `https://www.worldtides.info/api?extremes&lat=${lat}&lon=${lon}&key=${key}`
  console.log(url);

  axios.get(url)
    .then((res)=>{
      var extremes = res.data.extremes
      var tidesNode = document.getElementById("tides");
      while (tidesNode.firstChild) {
          tidesNode.removeChild(tidesNode.firstChild);
      };
        
      extremes.map((extreme) => {
        extreme.date = moment(extreme.date).format('ddd  hh:mm');

        if (extreme.type === 'High') {
          extreme.isHigh =  true
        } else {
          extreme.isHigh = false
        }

        var li = document.createElement('li');
        li.innerText=extreme.isHigh + ' ' + extreme.height + ' ' + extreme.date;
        li.id = extreme.dt;
        tides.appendChild(li);

        return extreme;
      })
      console.log(extremes);

    })
    .catch((err)=>{
      console.log(err);
    })
};
