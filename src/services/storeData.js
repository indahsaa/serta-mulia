const { Firestore } = require('@google-cloud/firestore');
 
async function storeData(id, data) {
  const db = new Firestore();
  try {
      const docRef = db.collection('prediction').doc(id);
      await docRef.set(data);
      console.log('Data berhasil disimpan ke Firestore');
  } catch (error) {
      console.error('Gagal menyimpan data ke Firestore:', error);
      throw error; // Lemparkan kembali error untuk menangkapnya di luar fungsi
}
}
module.exports = storeData;