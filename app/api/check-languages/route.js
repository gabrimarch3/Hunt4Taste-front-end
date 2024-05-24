import mysql from 'mysql2/promise';

export async function GET(request) {
  const connection = await mysql.createConnection({
    host: 'ng1.spottywifi.it',
    user: 'www54192',
    password: 'ZMSTKQGGLOQTBXY',
    database: 'www54192',
  });

  try {
    const [cardTesti] = await connection.execute('SELECT DISTINCT language FROM card_testi');
    const [experiencesTesto] = await connection.execute('SELECT DISTINCT language FROM experiences_testo');
    const [productsTesti] = await connection.execute('SELECT DISTINCT language FROM products_testi');
    const [servicesTesti] = await connection.execute('SELECT DISTINCT language FROM services_testi');

    const languages = new Set();
    cardTesti.forEach(row => languages.add(row.language));
    experiencesTesto.forEach(row => languages.add(row.language));
    productsTesti.forEach(row => languages.add(row.language));
    servicesTesti.forEach(row => languages.add(row.language));

    return new Response(JSON.stringify([...languages]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching languages:', error);
    return new Response(JSON.stringify({ error: 'Error fetching languages' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } finally {
    await connection.end();
  }
}
