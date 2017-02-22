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

      var spinner = document.getElementById('spinner');
      spinner.style.display = 'none';

      extremes.map((extreme) => {
        extreme.date = moment(extreme.date).format('ddd  hh:mm');

        var ul = document.createElement('ul');
        ul.className  = 'tide';
        var liOuter = document.createElement('li');

        var image = document.createElement('img');
        if (extreme.type === 'High') {
          image.src  =  '/assets/img/arrow-up-right.svg';
        } else {
          image.src =  '/assets/img/arrow-down-right.svg';
        }

        var liImage = document.createElement('li');
        liImage.appendChild(image);
        ul.appendChild(liImage);

        var liType = document.createElement('li');
        liType.innerText = extreme.type;
        ul.appendChild(liType);

        var liHeight = document.createElement('li');
        liHeight.innerText = extreme.height;
        ul.appendChild(liHeight);

        var liDate =document.createElement('li');
        liDate.innerText = extreme.date;
        ul.appendChild(liDate);

        liOuter.appendChild(ul);
        tides.appendChild(liOuter);
        return extreme;
      })
      console.log(extremes);

    })
    .catch((err)=>{
      console.log(err);
    })
};
