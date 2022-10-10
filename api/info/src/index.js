exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Serverless Todo',
          version: '1.0',
          state: 'demo'
        }, null, 2)
    };
    return response;
};