"use client";

import { useEffect, useRef, useState } from 'react';

export default function Home() {



  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  const [idade, setIdade] = useState(null);
  const [aniversario, setAniversario] = useState(false);
  const [erroDataInvalida, setErroDataInvalida] = useState('');

  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)


  function setPlayingState(state) {
    setIsPlaying(state)
  }

  function toggleIsPlaying() {
    setIsPlaying(!isPlaying)
  }


  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])




  // Função para calcular a idade
  const calcularIdade = () => {
    const dataAtual = new Date();
    const diaAtual = dataAtual.getDate();
    const mesAtual = dataAtual.getMonth() + 1; // Mês é baseado em 0
    const anoAtual = dataAtual.getFullYear();

    const diaNascimento = parseInt(dia);
    const mesNascimento = parseInt(mes);
    const anoNascimento = parseInt(ano);

    // Verifica se a data de nascimento é válida
    const dataNascimento = new Date(anoNascimento, mesNascimento - 1, diaNascimento);
    if (
      isNaN(dataNascimento.getTime()) || // Verifica se é NaN (data inválida)
      dataNascimento.getDate() !== diaNascimento || // Verifica se o dia é diferente
      dataNascimento.getMonth() + 1 !== mesNascimento || // Verifica se o mês é diferente
      dataNascimento.getFullYear() !== anoNascimento || // Verifica se o ano é diferente
      dataNascimento > dataAtual // Verifica se a data de nascimento ainda não ocorreu
    ) {
      alert('Data de nascimento inválida. Por favor, insira uma data válida.');
      setAniversario(false); // Define aniversario como false se a data for inválida
      return; // Sai da função se a data for inválida
    }

    let anos = anoAtual - anoNascimento;
    let meses = mesAtual - mesNascimento;
    let dias = diaAtual - diaNascimento;

    if (dias < 0) {
      meses--;
      const ultimoDiaDoMesAnterior = new Date(anoAtual, mesAtual - 1, 0).getDate();
      dias += ultimoDiaDoMesAnterior;
    }

    if (meses < 0) {
      anos--;
      meses += 12;
    }

    const pluralDia = dias === 1 ? 'dia' : 'dias';
    const pluralMes = meses === 1 ? 'mês' : 'meses';
    const pluralAno = anos === 1 ? 'ano' : 'anos';

    setIdade(`${anos} ${pluralAno}, ${meses} ${pluralMes}, ${dias} ${pluralDia}`);
  };

  // Função para verificar o aniversário
  const verificarAniversario = () => {
    const dataAtual = new Date();
    const diaAtual = dataAtual.getDate();
    const mesAtual = dataAtual.getMonth() + 1; // Mês é baseado em 0
    const anoAtual = dataAtual.getFullYear()



    if (parseInt(dia) === diaAtual && parseInt(mes) === mesAtual && parseInt(ano) < anoAtual) {
      setAniversario(true);
    } else {
      setAniversario(false);
    }
  };

  console.log(aniversario)





  return (
    <div>
      <main id='cardWhite'>
        <div id='inputs'>
          <input
            type='text'
            placeholder='DD'
            id='dia'
            value={dia}
            onChange={(e) => setDia(e.target.value)}
            inputMode='numeric'
            pattern='[0-9]*'
            autoComplete='off'
          />
          <input
            type='text'
            placeholder='MM'
            id='mes'
            value={mes}
            onChange={(e) => setMes(e.target.value)}
            inputMode='numeric'
            pattern='[0-9]*'
            autoComplete='off'
          />
          <input
            type='text'
            id='ano'
            placeholder='YYYY'
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            inputMode='numeric'
            pattern='[0-9]*'
            autoComplete='off'
          />
          <button id='calcular' onClick={() => { calcularIdade(); verificarAniversario(); }}>
            CALCULAR
          </button>
          <div id='IDADE'>{idade}</div>

          {aniversario === true && (
            <div id='msg'>Parabéns!</div>
          )}





          {isPlaying ? (
            <button onClick={toggleIsPlaying}>Pause</button>
          ) : (
            <button onClick={toggleIsPlaying}>Play</button>
          )
          }


          <audio
            src='/happy-birthday.mp3'
            autoPlay={aniversario === true}
            ref={audioRef}
            onPlay={() => {
              console.log("Áudio está sendo reproduzido");
              setPlayingState(true);
            }}
            onPause={() => setPlayingState(false)}
          />


        </div>
      </main>
    </div>
  );
}
