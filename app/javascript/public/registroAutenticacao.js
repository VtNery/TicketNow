        //Coletar Informações Formulario de Cadastros//
    const registrationForm = document.getElementById('registrationForm');
    const campos = document.querySelectorAll('.required');
    const spans = document.querySelectorAll('.span-required');
    const divRequired = document.querySelectorAll('.div-required');
    //string de validação de email 
    const validaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //string de validação campos com somente numeros
    const validaCPF = /^\d+$/;
    //Funções para mostrar as mensagens de erro caso tenha algum problema com os campos   
    function mostrarErro(index) {
        divRequired[index].classList.add('border-red-600')
        spans[index].classList.add('block')
        spans[index].classList.remove('hidden')
    }

    function esconderErro(index) {
        divRequired[index].classList.remove('border-red-600')
        spans[index].classList.remove('block')
        spans[index].classList.add('hidden')
    }

    //Função que valida o nome para pelo menos 3 letras
    function nameValidate(event) {
        if (campos[0].value.length < 3) {
            mostrarErro(0);
            event.preventDefault();
        } else {
            esconderErro(0)
        }
    }

    //Função que valida o Sobrenome para pelo menos 3 letras
    function sobrenomeValidate(event) {
        if (campos[1].value.length < 3) {
            mostrarErro(1);
            event.preventDefault();
        } else {
            esconderErro(1);
        }
    }

    //Função que valida o CPF sem letra e com 11 numeros
    function CPFValidate(event) {
        const cpf = campos[2].value;
        if (!validaCPF.test(cpf) || cpf.length !== 11) {
            mostrarErro(2);
            event.preventDefault();
        } else {
            esconderErro(2);
        }
    }

    function dataValidate(event) {
        var dataEscolhida = campos[3].value;
        var dataDigitada = new Date(dataEscolhida);

        // Verifica se a data digitada é inválida ou se é uma data futura
        if (isNaN(dataDigitada.getTime()) || dataDigitada < new Date()) {
            esconderErro(3);
            
        }else{
            mostrarErro(3);
            event.preventDefault();
        }
        
    }

    //Função que valida o email
    function EmailValidate(event) {
        const email = campos[4].value;
        if (!validaEmail.test(email)) {
            mostrarErro(4);
            event.preventDefault();
        } else {
            esconderErro(4);
        }
    }

    //Função que valida a senha Principal para pelo menos 8 digitos
    function senhaPrincipalValidate(event) {
        if (campos[5].value.length < 8) {
            mostrarErro(5);
            event.preventDefault();
        } else {
            esconderErro(5);
            senhaSecundariaValidate(event);
        }
    }

    //Função que valida a confirmação da senha para ser equivalente a senha principal
    function senhaSecundariaValidate(event) {
        if (campos[5].value == campos[6].value) {
            esconderErro(6);
        } else {
            mostrarErro(6);
            event.preventDefault();
        }
    }

    // Função para enviar os dados do formulário para o servidor

    //Valida ao enviar formulario se os campos estão corretos
    registrationForm.addEventListener('submit', (event) => {    
        nameValidate(event);
        sobrenomeValidate(event);
        dataValidate(event);
        EmailValidate(event);
        CPFValidate(event);
        senhaPrincipalValidate(event);
        senhaSecundariaValidate(event);
    });