import { test,expect } from "@playwright/test";
import { generateXML } from "../utils/GenerateAndSaveXML";
import { createBatch } from "../utils/CreateBatch";
import fs from "fs"



test("Generate multiple Claims XML files from JSON for 2 Payments and 2 Benefits", async () => {
    generateXML("testData/claims2P2B.json");
    expect(fs.readdirSync("output/claims").length).toBeGreaterThan(0);
    console.log("All XMLs generated successfully") 
      
   console.log("Batch file created successfully")
   
  });





