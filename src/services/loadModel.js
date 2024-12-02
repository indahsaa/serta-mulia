const tf = require('@tensorflow/tfjs-node');

async function loadModel() {
    if (!process.env.MODEL_URL) {
        throw new Error('MODEL_URL is not defined in the environment variables. Please set it in your .env file.');
    }

    try {
        const model = await tf.loadGraphModel(process.env.MODEL_URL);
        console.log('Model loaded successfully');
        return model;
    } catch (error) {
        console.error('Failed to load model:', error.message);
        throw new Error('Could not load the model. Please check the MODEL_URL and network connection.');
    }
}

module.exports = loadModel;
