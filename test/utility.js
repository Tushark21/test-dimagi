const extractData = (data)=>{
    const finalData={};
    finalData["placename"]= data.name;
    finalData["countryname"]= data.countryName;
    finalData["countrycode"]= data.countryCode;
    finalData["toponymname"]= data.toponymName;
    finalData["countryid"]= data.countryId;
    finalData["lng"]= data.lng;
    finalData["lat"]= data.lat;
    
    // console.log(finalData);
    return finalData;
}

module.exports= {extractData};