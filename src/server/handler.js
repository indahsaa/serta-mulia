const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  // Melakukan prediksi
  const { confidenceScore, label, explanation, suggestion } = await predictClassification(model, image);

  // Membuat ID unik dan waktu
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  // Menyiapkan data untuk disimpan
  const data = {
    "id": id,
    "result": label,
    "explanation": explanation,
    "suggestion": suggestion,
    "confidenceScore": confidenceScore,
    "createdAt": createdAt
  };

  // Menyimpan data ke Firestore
  try {
    await storeData(id, data);  // Menunggu hingga data disimpan sebelum melanjutkan
  } catch (error) {
    console.error("Error menyimpan data:", error);
    return h.response({
      status: 'error',
      message: 'Gagal menyimpan hasil prediksi.'
    }).code(500);
  }

  // Menyiapkan dan mengirim respons
  const response = h.response({
    status: 'success',
    message: confidenceScore > 99 ? 'Prediksi berhasil.' : 'Prediksi berhasil namun di bawah ambang batas. Silakan gunakan gambar yang tepat',
    data
  });
  response.code(201);  // Status Created
  return response;
}

module.exports = postPredictHandler;
