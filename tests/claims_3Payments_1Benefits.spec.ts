import { test,expect } from "@playwright/test";
import { generateXML } from "../utils/GenerateAndSaveXML";
import { createBatch } from "../utils/CreateBatch";
import fs from "fs"

const jsonfile="testData/claims3P1B.json"

test("Generate multiple Claims XML files from JSON for 3 Payments and 1 Benefit @sanity", async () => {
    generateXML("testData/claims3P1B.json");
     expect(fs.readdirSync("output/claims").length).toBeGreaterThan(0);
    console.log("All XMLs generated successfully")  
   console.log("Batch file created successfully")
   
  });
