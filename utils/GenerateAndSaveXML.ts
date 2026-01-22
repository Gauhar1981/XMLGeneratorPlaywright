import testData from "../testData/claims2P2B.json"
import fs from "fs";
import path from "path";
import { generateClaimsXml2P2B } from "../utils/XMLGenerator2P2B.ts";
import { generateClaimsXml3P1B } from "../utils/XMLGenerator3P1B.ts"
import { createBatch } from "../utils/CreateBatch.ts";
 

export function generateXML(jsonfile:any)
{
   const dataPath = path.resolve(process.cwd(), jsonfile);
   console.log("📄 JSON path:", dataPath);
  const claims = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  console.log("📄 Claims count:", claims.length);

  const outputDir = path.resolve(process.cwd(), "output/claims");
  console.log("📁 Output dir:", outputDir);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  //let i=0;
  claims.forEach((claim: any,index:number) => {
     const now = new Date();

  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
   const hh = String(now.getHours()).padStart(2, "0");
  const ms = String(Math.floor(now.getMilliseconds())).padStart(1, "0");

  const paymentCount = claim.Payments_loop.length;
  console.log("💲 Payments count:", paymentCount);

  if (!paymentCount) {
  throw new Error(`Payments_loop missing for claim ${index}`);
}
//const ID = `MKMO${Date.now()}_${index}`;
     const ID="MKMO"+mm+dd+yyyy+"-"+hh+ms
    let xml: string;

    if (paymentCount === 2) {
      xml = generateClaimsXml2P2B(claim, ID);
    }
    else if (paymentCount === 3) {
      xml = generateClaimsXml3P1B(claim, ID);
    }
    else {
      console.warn("⚠️ Skipped claim "+hh+ms);
      return;
    }

    // ✅ USE claim directly — NO rereading JSON
    //const fileName = `${claim.general.DN0004}_${ID}.xml`;
    const fileName=`${ID}.xml`
    const fullPath = path.join(outputDir, fileName);

    fs.writeFileSync(fullPath, xml, "utf-8");
    console.log(`✅ Generated XML: ${fileName}`);   
    
    
})
 createBatch();

}