import React from "react"
import {Card, StyledBody, StyledAction} from 'baseui/card';
import { Button } from "baseui/button";


const ListingCard = ({content}) => {
  return (
        <Card
      overrides={{Root: {style: {width: '328px'}}}}
      headerImage={
         content.listingImages[0] 
      }
      title={content.title}
    >
      <StyledBody>
        Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla
        ornare faucibus ex, non facilisis nisl.
      </StyledBody>
      <StyledAction>
        <Button overrides={{BaseButton: {style: {width: '100%'}}}}>
          Button Label
        </Button>
      </StyledAction>
    </Card>
    )
}

export default ListingCard