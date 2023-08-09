import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

type PokemonCardProps = {
  mode?: 'normal' | 'compact';
  pokemon: any;
  discovered: () => boolean;
};

export default function PokemonCard({
  pokemon: p,
  discovered,
  mode = 'normal',
}: PokemonCardProps) {
  return (
    <Container>
      <img
        alt={p['name']}
        src={p['sprites']['other']['dream_world']['front_default']}
        height={mode === 'compact' ? '100px' : '200px'}
        className={!discovered() ? 'blacked-image' : ''}
      />
      <h2>{p['name']}</h2>
      <p>
        <strong>Base experience:</strong>
        {mode === 'compact' ? ' ' : <br />}
        <span>{!discovered() ? '-' : p['base_experience']}</span>
      </p>
      <p>
        <strong>Height:</strong>
        {mode === 'compact' ? ' ' : <br />}
        <span>{!discovered() ? '-' : p['height']}</span>
      </p>
      <p>
        <strong>Abilities:</strong>
        {mode === 'compact' ? ' ' : <br />}
        <span>
          {!discovered()
            ? '-'
            : p['abilities'].map((a: any) => a['ability']['name']).join(', ')}
        </span>
      </p>
      <p>
        <strong>Stats:</strong>
        {mode === 'compact' ? ' ' : <br />}
        <span>
          {!discovered()
            ? '-'
            : p['stats']
                .map((s: any) => `${s['stat']['name']}: ${s['base_stat']}`)
                .join(', ')}
        </span>
      </p>
    </Container>
  );
}
