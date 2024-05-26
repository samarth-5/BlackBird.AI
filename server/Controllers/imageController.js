import fetch from 'node-fetch';

export const imageGeneration = async(req,res) =>{
    //console.log(req.body);
    const prompt = req.body.prompt;
    try{
    async function run() {
        const resp = await fetch(
          `https://api.limewire.com/api/image/generation`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Api-Version': 'v1',
              Accept: 'application/json',
              Authorization: `Bearer ${process.env.IMAGE_KEY}`
            },
            body: JSON.stringify({
              prompt,
              aspect_ratio: '1:1'
            })
          }
        );
      
        const data = await resp.json();
        //console.log(data);
        return res.status(200)
                  .json(data);
      }      
      run();
    }
    catch(err){
        return res.status(402)
                  .json(err);
    }
} 