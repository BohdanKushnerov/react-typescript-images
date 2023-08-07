import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Header, Form, SearchButton, Input } from './Searchbar.styled';

type SearchbarProps = {
  onSubmit: (input: string) => void;
};

export function Searchbar({ onSubmit }: SearchbarProps) {
  const [input, setInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(input);
    setInput('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <BsSearch size={'2em'} />
        </SearchButton>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={input}
          onChange={handleChange}
        />
      </Form>
    </Header>
  );
}
