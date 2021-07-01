export const findCountry = async (countryName, url) => {
    const storedCountriesString = localStorage.getItem("countries");
    const storedCountries = storedCountriesString ? JSON.parse(storedCountriesString) : [];
    const storedCountry = storedCountries.find(item => item.countryName === countryName);

    if (storedCountry) {
        return storedCountry.results;
    }

    const results = await fetch(`${url}${countryName}`, {
        headers: {
            "x-rapidapi-key": "c37641f051mshe682881ca808e3ep1b0ba1jsne813ccecdbfb",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "useQueryString": true
        },
    }).then(data => data.json()).then(({ Places }) => Places).catch(() => {
        alert("No such country");
        return [];
    });

    if (results.length) {
        if (!storedCountries.some(item => item.CountryName === countryName)) {
            storedCountries.push({ countryName, results });
            localStorage.setItem(
                "countries",
                JSON.stringify(storedCountries)
            )
        }
    }

    return results;
}