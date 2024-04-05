require("dotenv").config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { storeInDB, getAllData } = require('./DBUtility');
const { generateAccessToken, tokenVerify, checkUser } = require('./AuthService');
const { extractData } = require('./utility');
const { getCode } = require('country-list');


const app = express();
app.use(cors());
const PORT = "8000";

const mainData = {
    totalResultsCount: 5,
    geonames: [
    {
    adminCode1: "07",
    lng: "77.23149",
    geonameId: 1273294,
    toponymName: "Delhi",
    countryId: "1269750",
    fcl: "P",
    population: 10927986,
    countryCode: "IN",
    name: "Delhi",
    fclName: "city, village,...",
    adminCodes1: {
    ISO3166_2: "DL"
    },
    countryName: "India",
    fcodeName: "seat of a first-order administrative division",
    adminName1: "Delhi",
    lat: "28.65195",
    fcode: "PPLA"
    },
    {
    adminCode1: "07",
    lng: "77.1",
    geonameId: 1273293,
    toponymName: "National Capital Territory of Delhi",
    countryId: "1269750",
    fcl: "A",
    population: 16787941,
    countryCode: "IN",
    name: "Delhi",
    fclName: "country, state, region,...",
    adminCodes1: {
    ISO3166_2: "DL"
    },
    countryName: "India",
    fcodeName: "first-order administrative division",
    adminName1: "Delhi",
    lat: "28.6667",
    fcode: "ADM1"
    },
    {
    adminCode1: "35",
    lng: "81.32847",
    geonameId: 10531612,
    toponymName: "Delhi",
    countryId: "1269750",
    fcl: "P",
    population: 0,
    countryCode: "IN",
    name: "Delhi",
    fclName: "city, village,...",
    adminCodes1: {
    ISO3166_2: "MP"
    },
    countryName: "India",
    fcodeName: "populated place",
    adminName1: "Madhya Pradesh",
    lat: "24.73392",
    fcode: "PPL"
    },
    {
    adminCode1: "35",
    lng: "81.58003",
    geonameId: 10532476,
    toponymName: "Delhi",
    countryId: "1269750",
    fcl: "P",
    population: 0,
    countryCode: "IN",
    name: "Delhi",
    fclName: "city, village,...",
    adminCodes1: {
    ISO3166_2: "MP"
    },
    countryName: "India",
    fcodeName: "populated place",
    adminName1: "Madhya Pradesh",
    lat: "24.63427",
    fcode: "PPL"
    },
    {
    adminCode1: "35",
    lng: "81.57507",
    geonameId: 10532517,
    toponymName: "Delhi",
    countryId: "1269750",
    fcl: "P",
    population: 0,
    countryCode: "IN",
    name: "Delhi",
    fclName: "city, village,...",
    adminCodes1: {
    ISO3166_2: "MP"
    },
    countryName: "India",
    fcodeName: "populated place",
    adminName1: "Madhya Pradesh",
    lat: "24.6444",
    fcode: "PPL"
    }
    ]
    };

app.use(express.json());

app.post("/login", (req, res)=>{
    console.log("LOGIN");
    const {id, password}=req.body;
    // console.log(id, password);

    if(!checkUser(id, password)){
        return res.sendStatus(401);
    }
    
    const accessToken= generateAccessToken({id});
    
    res.json({
        accessToken,
    })
});

app.post("/verify", tokenVerify, (req, res)=>{
    console.log("VERIFY");

    res.json({
        "message": "valid"
    })
});

app.post("/updatelocation", tokenVerify, async (req, res)=>{
    console.log("UPDATELOCATION");
    const {countryname, place, id}=req.body;
    const countryCode = getCode(countryname);
    const query= "http://api.geonames.org/searchJSON?name_equals=" + place + "&country=" + countryCode + "&maxRows=10&username=dimagi";

    // console.log(countryCode, place, query);
    let result= await axios.get(query);
    result=result.data.geonames;
    // const result = mainData.geonames;
    // console.log(result);

    if(result && result.length>0){
        const dbResult = storeInDB(id, extractData(result[0]));
        //console.log(dbResult);
        return res.json(dbResult);
    }
    
    res.sendStatus(400);
});

app.get('/getall', (req, res)=>{
    console.log("GETALL");
    res.json(getAllData());
});

app.listen(PORT, () => {
    console.log("Server Running on PORT: ", PORT);
});