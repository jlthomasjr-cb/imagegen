// https://github.com/ParametricCamp/TutorialFiles/blob/master/Misc/Dall-E/nodejs/dalle-generate.js
// npm 9.6.7; node v18.17.1

const { Configuration, OpenAIApi } = require("openai");
const fs = require('fs');

const key ="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";

const configuration = new Configuration({
    apiKey: key
});
const openai = new OpenAIApi(configuration);

const predict = async function () {
    const response = await openai.createImage({
        prompt: "colorful crayon sketch of small blocks connected with chain in a planetary way",
        n: 1,
        //size: "256x256",
        size: "1024x1024",
        response_format: 'b64_json',
    });

    return response.data;
}

predict()
    .then(
        response => {
            const now = Date.now();
            for (let i = 0; i < response.data.length; i++)
            {
                const b64 = response.data[i]['b64_json'];
                const buffer = Buffer.from(b64, "base64");
                // const filename = `image_${now}_${i}.png`;
                const filename = 'output/background.png';
                fs.writeFileSync(filename,buffer);
                console.log("done with background image " + filename);
            
                // Include gm library
                const gm = require('gm');

                gm()
                    .in('-page', '+0+0')  // Custom place for each of the images
                    .in(filename).resize(1000, 563, "!")
                    .in('-page', '+0+0')
                    .in('layers/CoinaversaryNFTimage_HP_0006_Frame.png')
                    .in('-page', '+0+0')
                    .in('layers/CoinaversaryNFTimage_HP_0005_Yellowdot.png')
                    .in('-page', '+0+0')
                    .in('layers/CoinaversaryNFTimage_HP_0003_Coinaversary.png')
                    .in('-page', '+0+0')
                    .in('layers/CoinaversaryNFTimage_HP_0004_Standwithcrypto.png')
                    .in('-page', '+0+0')
                    .in('layers/CoinaversaryNFTimage_HP_0002_CBlogo.png')
                    .in('-page', '+0+0')
                    .in('layers/CoinaversaryNFTimage_HP_0001_Wdphoto.png')
                    .in('-page', '+0+0')
                    .in('layers/CoinaversaryNFTimage_HP_0000_Date.png')
                    //.minify()  // Halves the size, 512x512 -> 256x256
                    .mosaic()  // Merges the images as a matrix
                    .write('output/CoinaversaryNFTimage.png', function (err) {
                        if (!err) console.log('done with output');
                    });
            }
        }
    )

    

