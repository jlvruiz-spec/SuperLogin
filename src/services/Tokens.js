class Tokens {
	async token(){

		try{
			const response = await fetch(import.meta.env.VITE_APP_ROUTE1 + 'api/Auth/Login',{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({"username":"userOne","password":"pass123"})
			});
			
			if (!response.ok){
				throw new Error('Error al renovar el token CRM');
			}
			const result = await response.json();
			console.log('Se generó el token');
			localStorage.setItem('token',result.data); 
			return result.data;
		} catch (error){
			throw error;
		}

		
	}

}

export default Tokens;