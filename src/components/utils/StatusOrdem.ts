export const StatusOrdem = (value: any) => {
    let av;
    switch (value) {
        case 1:
            av = 'Ordem aberta';
            break;
        case 2:
            av = 'Aguardando Avaliação';
            break;
        case 3:
            av = 'Ordem fechada';
            break;
        case 4:
            av = 'Executando reparo';
            break;
        case 5:
            av = '(CN)Serviço concluído';
            break;
        case 6:
            av = '(CA)Serviço concluído';
            break;
        default:
            av = 'Entregue ao cliente';
    }
    return av;
};