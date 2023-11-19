import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'
import { Form, Input, Button, Space } from 'antd';
import * as S from './App.styles';
import {CopyToClipboard} from 'react-copy-to-clipboard';

function App() {
  const [showCopied, setShowCopied] = useState(false);
  const [copied, setCopied] = useState<number>(0);
  const [linkToCopy, setLinkToCopy] = useState("");
  const [url, setUrl] = useState();

  useEffect(() => {
    if(copied != 0){
      setShowCopied(true);
      setTimeout(() => {
        setShowCopied(false);
      }, "5000");
    }
  }, [copied])

  const onFinish = () => {
    console.log(url);
    const request = { original: url.replace('https://www.ine.gov.mz/', '')};
    axios
      .post('http://localhost:3000/new_link', request)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((resp: any) => {
        if (resp.status == 200) {
          if(resp.data) {
            setLinkToCopy("https://www.ine.gov.mz/sl?n="+resp.data.shorter_link);
          } 
        }
      });
      // settime
  };

  return (
    <>
      <div className="container">
        <div className="settings">
          <div className='form'>
            <Form>
              <Form.Item label={'URL'} className="mb-3" placeholder="URL API">
                <Input
                  type="primary"
                  onChange={
                    (e) => {
                      setUrl(e.target.value);
                    }
                  }
                />
              </Form.Item>
            </Form>
            <div className="d-grid gap-2">
              <Button type="primary" onClick={onFinish}>
                <b>Gerar link curto</b>
              </Button>
            </div>
          </div>
        </div>
        <div className='displayTable'>
          {linkToCopy &&
          <>
            <h4 className='h6'>Link Curto</h4>
              <div style={{ display: 'inline-block', position: 'absolute', top: '10px', right: 0}}>
                <span style={{ color: (showCopied ? 'black' : 'white') }}>Copiado </span>
                <CopyToClipboard text={linkToCopy}
                  onCopy={() => setCopied(copied + 1)}>
                  <S.Button>Copiar</S.Button>
                </CopyToClipboard>
              </div>
            <div>
              <S.ShortLink>{linkToCopy}</S.ShortLink>
            </div>
          </>
          }
        </div>
      </div>
    </>
  )
}

export default App
