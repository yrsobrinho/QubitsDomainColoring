
let canvas = null;
let guppy;
let qtndInteiros = 2;

var funcaoHover;
var resultado_real = 'a';
var resultado_imag = 'b';

let tipo_grafico = 1;

function HSLtoRGB(h, s, l) {
    let r, g, b;
    if (s == 0) {
        r = g = b = l;
    } else {
        let hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) {
                t += 1;
            }
            if (t > 1) {
                t -= 1;
            }
            if (t < 1 / 6) {
                return p + (q - p) * 6 * t;
            }
            if (t < 1 / 2) {
                return q;
            }
            if (t < 2 / 3) {
                return p + (q - p) * (2 / 3 - t) * 6;
            }
            return p;
        }
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}


function Eixos (imgDataEixos, numeroInteiro){
    if (false) {
    let dataEixos = imgDataEixos.data;
    
    let posicoesInteiros = [];

    let cont = qtdInteiros * (-1);
    for (i = 0; i < ((qtdInteiros*2)+1); i++){
        posicoesInteiros[i] = numeroInteiro*cont;
        cont++;
    }

    console.log(posicoesInteiros);    

    let tamanhoEixo = 2;
    for (x = 0; x < width; x++){
        for (y = 0; y < height; y++){
            let px = (x + y * width) * 4;
            if ((x > centro-tamanhoEixo && x < centro+tamanhoEixo) || 
            (y > centro-tamanhoEixo && y < centro+tamanhoEixo)){
                dataEixos[px] = 100;
                dataEixos[px + 1] = 100;
                dataEixos[px + 2] = 100;
                dataEixos[px + 3] = 255;
            }

            posicoesInteiros.forEach(posicao => {
                let xCentro = x-centro;
                if ((xCentro > posicao-tamanhoEixo && xCentro < posicao+tamanhoEixo) && (y > centro-10 && y < centro+10)){
                    dataEixos[px] = 100;
                    dataEixos[px + 1] = 100;
                    dataEixos[px + 2] = 100;
                    dataEixos[px + 3] = 255;
                    //console.log("Posção em: " + posicao + "px");
                }

                let yCentro = y-centro;
                if ((yCentro > posicao-tamanhoEixo && yCentro < posicao+tamanhoEixo) && (x > centro-10 && x < centro+10)){
                    dataEixos[px] = 100;
                    dataEixos[px + 1] = 100;
                    dataEixos[px + 2] = 100;
                    dataEixos[px + 3] = 255;
                    //console.log("Posção em: " + posicao + "px");
                }
            });
        }
    }
    }


    //Coloca uma barra vertical de 10px de altura em cada numero inteiro


    //eixosContext2d.putImageData(ImgDataEixos, 0, 0);

    //console.log("Eixos desenhados: " + numeroInteiro);

    return imgDataEixos;
}


function getZvalue(a, b, f){
    
    let ret = {'z':{real: a, imag: b}};
    ret = {'z': f(ret)};
    return ret['z'];
}



//Recebe um pixel (real e imag) e retorna o valor real e imag em numeros inteiros.
function getNumeroInteiro(x, y){
    let width = canvas.width;
    let centro = width/2;

    let pixelPorInteiro = (centro)/Number(qtndInteiros);
    let real = (x-centro)/pixelPorInteiro;
    let imag = (y-centro)/pixelPorInteiro;

    return [real, imag];
}


//Receber um ponto e converte-lo para uma cor
//O cauculo do ponto é feito em outra função.
function Domain_coloring(real, imag)
{
    
    //Checa se explodiu para o infinito.
    if (real >= 9e+10 || real <= -9e+10 || imag >= 9e+10 || imag <= -9e+10){
        return [255,255,255];
    }

    //Angulo
    let hue = (Math.atan2(imag, real)) / (2*Math.PI) + 0.375;

    //Caucula a distancia do ponto até o centro (modulo)
    let dist = Math.sqrt(real * real + imag * imag);

    let modulo;

    

    if (tipo_grafico == 2){
        //Modo 2 (com descontinuidade):
        let expoente = Math.log2(dist);

        let expoente_decimal = 0;
        if (dist > 0){
            expoente_decimal = (expoente - Math.floor(expoente) -1)*(-1);
        }
        else{
            expoente_decimal = (expoente - Math.floor(expoente));
        }
        
        modulo = 1/((expoente_decimal**0.2) +1)-0.1;
    }
    else{
        //Modo 1 (sem descontinuidade):
        modulo = (2/Math.PI) * Math.atan(dist);
        let a = 0.4;
        modulo = (dist**a)/((dist**a)+1);
    }
    
    

            
    //let theta = (Math.atan(imag/real)) + (2*Math.PI);
    //if (real < 0)
    //{
    //    theta = theta + Math.PI;
    //}
    //theta *= 180/Math.PI;
    //const hue = theta % 360;
    
    //canvas.fillStyle = "hsl(" + hue + ", 100%, " + modulo*100 + "%)";
    //canvas.fillRect(x,y, 1,1);
            
            
    if (real =='Infinity' || real == '-Infinity' && imag == 'Infinity' || imag == '-Infinity'){
        modulo = 1;
    }
    let color = HSLtoRGB(hue, 1, modulo);
    return color;
    //Array de cores r[0] g[1] b[2]
}

//Receber o canvas, rodar por todos os pixels e colocar a cor
function Plotter(guppy){
    /*alert('Guppy: ' + guppy)
    const f = guppy.func(operacoes);
    alert(guppy.engine.get_content('ast'));
    alert('f: ' + f)
    f({z: {real: 1, imag: 1}});
    alert('f({z: {real: 1, imag: 1}}): ' + f({z: {real: 1, imag: 1}}))*/
    const canvasContext2d = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    let INICIO = performance.now();
    //Cria um array de pixels
    const canvasImageData = canvasContext2d.createImageData(width, height);
    const canvasData = canvasImageData.data;
    const funcao = guppy.func(operacoes);
    funcaoHover = funcao;
    //Percorre todos os pixels
    for (let x = 0; x < width; x++){
        for (let y = 0; y < height; y++){

            //antes de passar pela função
            let realAntes = getNumeroInteiro(x, y)[0];
            let imagAntes = getNumeroInteiro(x, y)[1];

            //Passamos os valores real e imag pela função
            //let z = getZvalue(realAntes, imagAntes, guppy.func(operacoes));
            let z = funcao({'z': {real: realAntes, imag: imagAntes}});
            real = z.real;
            imag = z.imag;

            //Pega a cor do pixel
            const color = Domain_coloring(real, imag);

            //Pega a posição do pixel
            const px = (x + y * width) * 4;

            //Coloca a cor no pixel
            canvasData[px] = color[0];
            canvasData[px + 1] = color[1];
            canvasData[px + 2] = color[2];
            canvasData[px + 3] = 255;
        }
    }
    let FIM = performance.now();
    console.log(FIM-INICIO);
    //Coloca a imagem no canvas
    canvasContext2d.putImageData(canvasImageData, 0, 0);
    console.log("Imagem desenhada");

}
function carregar()
{
    guppy = new Guppy('guppy1');
    //alert(guppy)
    guppy.engine.set_content(funcaoBase);
    guppy.engine.add_symbol("conj", {"output": {"latex":"\\overline{{$1}}", "text":"conj($1)"}, "attrs": { "type":"conj", "group":"function"}});
    adicionarFuncao(guppy,"re","Re","Re","Re");
    adicionarFuncao(guppy,"sen","sen","sen","sin");
    adicionarFuncao(guppy,"tg","tg","tg","tan");
    adicionarFuncao(guppy,"hsen","senh","senh","sinh");
    adicionarFuncao(guppy,"hcos","cosh","cosh","cosh");
    adicionarFuncao(guppy,"htan","tanh","tanh","tanh");
    adicionarFuncao(guppy,"htg","tanh","tanh","tanh");
    adicionarFuncao(guppy,"arcsen","arcsen","arcsen","arcsin");
    adicionarFuncao(guppy,"arctg","arctg","arctg","arctan");
    adicionarFuncao(guppy,"arcsec","arcsec","arcsec","arcsec");
    adicionarFuncao(guppy,"arccsc","arccsc","arccsc","arccsc");
    adicionarFuncao(guppy,"arccot","arccot","arccot","arccot");
    guppy.activate();
    init()
}
function init(){

    //alert(guppy)    
    
    document.addEventListener('keydown', function(event) {
        if (event.key == "Enter") {
            console.log(guppy.engine.get_content("ast"));
            console.log(guppy.func(operacoes))
            console.log(guppy.func(operacoes)({'z': {real: 1, imag: 1}}));  
            Plotter(guppy);
        }
    });
    canvas = document.getElementById("domainColorCanvas");

    let tamanhoCanvas = document.getElementById("tamanho_grafico").value;
    canvas.width = tamanhoCanvas;
    canvas.height = tamanhoCanvas;
    //alert(canvas);
    //var tempoInicial = performance.now();

    tipo_grafico = document.querySelector('input[name="tp_g"]:checked').value;
    
    qtndInteiros = document.getElementById('numero_inteiros').value;
    Plotter(guppy);
    //alert(qtndInteiros);
    //Função:
    resultado_real = document.getElementById('funcao_complexa_real').value;
    resultado_imag = document.getElementById('funcao_complexa_imag').value;

    const tudo = document.getElementById('tudo');
    canvas.addEventListener('mousemove', function(event) {
        const num_inteiro = getNumeroInteiro();
        const x = event.offsetX;
        const y = event.offsetY;

        let realAntes = getNumeroInteiro(x, y)[0];
        let imagAntes = getNumeroInteiro(x, y)[1];

        let z = funcaoHover({'z' : {real: realAntes, imag: imagAntes}});

        //console.log(z)

        let real = z.real; 
        let imag = z.imag;

        if (real > 100 || real < -100){
            real = Number(real).toExponential(3);
        }
        if (imag > 100 || imag < -100){
            imag = Number(imag).toExponential(3);
        }


        if (String(real).includes('e+'))
        {
            let real1 = real.toString().split('e+')[0];
            let real2 = real.toString().split('e+')[1];
            real = Number(real1).toFixed(3) + 'e+' + real2;
        }
        else{
            real = Number(real).toFixed(3);
        }

        if (String(imag).includes('e+'))
        {
            let imag1 = imag.toString().split('e+')[0];
            let imag2 = imag.toString().split('e+')[1];
            imag = Number(imag1).toFixed(3) + 'e+' + imag2;
        }
        else{
            imag = Number(imag).toFixed(3);
        }
        //da split em e+ na string e pega o primeiro valor
        



        tudo.innerHTML = (`<i>F( ${realAntes} + ${imagAntes * (-1)}i ) = ${real} + ${imag * (-1)}i</i>`);
    });


    /*console.log("Parte real antes do processamento: " + resultado_real);
    console.log("Parte imaginária antes do processamento: " + resultado_imag);
    //Substitui ^ para vários * para que o eval possa entender

    resultado_real = limparFuncao(resultado_real);
    resultado_imag = limparFuncao(resultado_imag);
    console.log("Parte real após o processamento: " + resultado_real);
    console.log("Parte imaginária após o processamento: " + resultado_imag);*/


}

