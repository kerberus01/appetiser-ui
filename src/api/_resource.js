import rest from './connection';

export const _resource = {
    query,
    save,
    update,
    destroy,

};

async function query(address) {
   return await rest.get(`/${address}`).then(response =>response.data).catch(response => response);
}

async function save(query, payload) {
	return await rest.post(`/${query}`,payload).then(response => response.data).catch(response => response);
}

async function update(payload) {
   return  await rest.put(`/${payload.query}/${payload.id}`,payload).then(response =>response.data).catch(response =>  console.log(response));
}

async function destroy(payload) {
   return  await rest.delete(`/${payload.query}/${payload.id}`).then(response =>response.data).catch(response =>  console.log(response));
}

