// Reference code
// https://github.com/ParametricCamp/TutorialFiles/blob/master/Misc/Dall-E/nodejs/dalle-generate.js
// npm 9.6.7; node v18.17.1

const { Configuration, OpenAIApi } = require("openai");
const fs = require('fs');

// Retrieve api key from environment variable
require('dotenv').config();
const key = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
    apiKey: key,
});

// Call the openai api
const openai = new OpenAIApi(configuration);
const predict = async function () {
    const response = await openai.createImage({
        prompt: "pastel sketch of small blocks connected with chain in a planetary way",
        n: 1,
        size: "1024x1024",
        response_format: 'b64_json',
    });

    return response.data;
}
// Process the response
predict()
    .then(
        response => {
            const now = Date.now();
            for (let i = 0; i < response.data.length; i++)
            {
                const b64 = response.data[i]['b64_json'];
                const buffer = Buffer.from(b64, "base64");
                const filename = 'output/background.png';
                fs.writeFileSync(filename,buffer);
                console.log("done with background image " + filename);
            
                // https://aheckmann.github.io/gm/
                // Use GraphicsMagick to merge the generated image with other images
                const gm = require('gm');
                gm()
                    .in('-page', '+0+0')  // location of the image
                    .in(filename).resize(1000, 563, "!")
                    .in('-page', '+0+0')
                    .in('layers/CoinaversaryNFTimage_HP_0007_Frame.png')
                    .in('-page', '+0+0')
                    .in('layers/CoinaversaryNFTimage_HP_0006_Yellowdot.png')
                    .in('-page', '+0+0')
                    .in('layers/CoinaversaryNFTimage_HP_0004_Coinaversary.png')
                    .in('-page', '+0+0')
                    .in('layers/CoinaversaryNFTimage_HP_0005_Standwithcrypto.png')
                    .in('-page', '+0+0')
                    .in('layers/CoinaversaryNFTimage_HP_0003_CBlogo.png')
                    .in('-page', '+0+0')
                    .in('layers/CoinaversaryNFTimage_HP_0002_Wdphoto.png')
                    .in('-page', '+0+0')
                    .in('layers/CoinaversaryNFTimage_HP_0001_Title.png')
                    .in('-page', '+0+0')
                    .in('layers/CoinaversaryNFTimage_HP_0000_Date.png')
                    .mosaic()  // Merges the images as a matrix
                    .write('output/CoinaversaryNFTimage.png', function (err) {
                        if (!err) console.log('done with output');
                    });
            }
        }
    )

    

