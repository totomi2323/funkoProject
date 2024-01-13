const userArgs = process.argv.slice(2);

const dataBase = require("./funko_pop.json");

const Item = require("./models/item");
const Series = require("./models/series");

require("dotenv").config();
const mongoose = require("mongoose");
const { promiseImpl } = require("ejs");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];
main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  await updateSeries();
  console.log("connection closed")
  await mongoose.connection.close();

}


async function createSeries() {
    const checkDuplicate = []
    dataBase.forEach((data) => {
        data.series.forEach((ser) => {
            const newSeries = new Series({name: ser})
            if (checkDuplicate.includes(ser))  {
               console.log("Not posted")
            } else {
                newSeries.save();
                checkDuplicate.push(ser)
                console.log("posted")
            }
        })
    })
 /*   await Promise.all(
        dataBase.map(async(data) => {
            await Promise.all(
                data.series.map(async (ser) => {
                    const newSeries = new Series({name: ser})
                    let findSeries = await Series.findOne({ name: ser }).exec();
                    if (!findSeries) {
                       await newSeries.save()
                        console.log("Added items: "+ i) 
                        i++
                    }
                    else {
                        console.log("found a duplicate")
                    }
                })
            )
        })
    )*/
}



 async function createItems() {
  await Promise.all(
    dataBase.map(async (data) => {
      const newItem = new Item({
        name: data.title,
        imgUrl: data.imageName,
        available: [],
        price: 0,
        alt: data.handle,
      });
      await Promise.all(
        data.series.map(async (ser) => {
          let findSeries = await Series.findOne({ name: ser }).exec();
          newItem.series.push(findSeries._id);
        })
      );
      await newItem.save();
    })
  );
}
async function updateSeries() {
    const allSeries = await Series.find().exec();
    const allItems = await Item.find().exec();

    for (const item of allItems) {
        for (const series of allSeries) {
            await Promise.all(
                item.series.map(async (itemSeries) => {
                    if (itemSeries._id.toString() === series._id.toString()) {
                        const newSeries = await Series.findById(series._id).exec();
                        newSeries.item.push(item._id)
                        await newSeries.save();
                    } else {
                       
                    }
                })
            )
        }
    }
}