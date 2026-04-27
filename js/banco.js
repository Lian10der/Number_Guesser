const _supabase = supabase.createClient(
    'https://nyrmzaqhjauvteorvtro.supabase.co', 
    'sb_publishable_K9auMoG0UMzmsejGYHVIKQ_PxwEESMz'
);

async function salvarPontuacao(nomeJogador, totalTentativas) {
    const { data, error } = await _supabase
        .from('leaderboard')
        .insert([{ nome: nomeJogador, tentativas: totalTentativas }]);

    if (error) console.error('Erro ao salvar:', error);
    else carregarLeaderboard(); // Atualiza a lista na tela
}

async function carregarLeaderboard() {
    const { data, error } = await _supabase
        .from('leaderboard')
        .select('*')
        .order('tentativas', { ascending: true })
        .limit(10);

    const corpoTabela = document.getElementById('lista-leaderboard');

    if (error) {
        corpoTabela.innerHTML = "<tr><td colspan='3'>Erro ao carregar :(</td></tr>";
        return;
    }

    if (data) {
        corpoTabela.innerHTML = data.map((item, index) => `
            <tr>
                <td>${index + 1}º</td>
                <td>${item.nome}</td>
                <td>${item.tentativas}</td>
            </tr>
        `).join('');
    }
}