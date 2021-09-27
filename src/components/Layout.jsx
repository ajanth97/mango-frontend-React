import React from "react"
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider, styled} from 'baseui';
import { Layer } from "baseui/layer";
import { NewNavbar } from "./NewNavbar";

const Centered = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  });

const Layout = ({children}) => {
    const [engine, setEngine] = React.useState(null);

    React.useEffect(() => {
      // Load the `styletron-engine-atomic` package dynamically.
      // Reason: It requires use of `document`, which is not available
      // outside the browser, so we need to wait until it successfully loads.
      // Source: https://www.gatsbyjs.org/docs/debugging-html-builds/
      import('styletron-engine-atomic').then(styletron => {
        const clientEngine = new styletron.Client();
        setEngine(clientEngine);
      });
    }, []);
  
    if (!engine) return null;
  
    return (
        <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
            <Centered>
               <NewNavbar/>
               <main>
                   <Layer>
                   {children}
                   </Layer>
               </main>
            </Centered>
            </BaseProvider>
        </StyletronProvider>
    )
}

export default Layout