        const country = document.querySelector('.country')
        const city = document.querySelector('.city')
        const time = document.querySelector('.time')
        const alt = document.querySelector('.alt')
        const err = document.querySelector('.err')
        // write a callback function with one argument that represents the data in getCurrentPosition
        const success = (position) => {
            // access longitude, latitude and altitude
            const longitude = position.coords.longitude
            const latitude = position.coords.latitude
            const altitude = position.coords.altitude
            
            const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // access  the country and city, also get the time. use the accessed data to fill the created elements
                    country.textContent = data.address.country
                    city.textContent = data.address.city || data.address.village || 'city not available'
                    time.textContent = new Date().toLocaleTimeString()
                    alt.textContent = altitude || 'altitude not available'
                })
        }
        //write a callback function to display error message
        const error = () => {
            err.textContent = 'unable to get location, check internet connectivity'
        }
        // access getCurrentPosition in the navigator api, pass in the variables holding the callback functions for success and error
        navigator.geolocation.getCurrentPosition(success, error)