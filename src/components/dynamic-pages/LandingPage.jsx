import React from "react"
import { RouteComponentProps } from "@reach/router"
import ListingCard from "../ListingCard";
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';
import { Layer } from "baseui/layer";
import {StyledSpinnerNext} from 'baseui/spinner';
import { useUser } from "../../hooks/useUser";
import useSWR from "swr";


const itemProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

const fetcher = (...args) => fetch(...args).then(res => res.json())

const LandingPage = () => {
   const {data, error} = useSWR('https://secnds-server.herokuapp.com/listing/all', fetcher)    
    if (error){
        return <div>Error failed to Load</div>
    }
    
    if (!data && !error) return <StyledSpinnerNext/> 
    if (error) return (<div>Login failed invalid token</div>)

    function createListingCard(content){
      return (
        <FlexGridItem key={content.id} {...itemProps}><ListingCard content={content}/></FlexGridItem> 
      )
    }
     const listingCards = data.map(createListingCard)
    return (
        <Layer>
        <FlexGrid
        flexGridColumnCount={[1,2,3,4]}
        flexGridColumnGap="scale800"
        flexGridRowGap="scale800"
      >
       {listingCards}
      </FlexGrid>
      </Layer>
    )
}

export default LandingPage
