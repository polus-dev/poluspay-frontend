import { Button, Div, ModalPage, ModalPageHeader } from "@vkontakte/vkui"
import { Icon56InfoOutline } from '@vkontakte/icons';
import { FC } from "react"

interface NewType {
  id: string
  onClose: () => void
  logOut: () => void
}

export const LogoutModal: FC<NewType> = (props) => (
  <ModalPage
    id={props.id}
    className="polus"
    onClose={props.onClose}
    dynamicContentHeight
    // settlingHeight={100}
    header={
      <ModalPageHeader
      // after={
      //   <Icon56InfoOutline />
      // }
      >
        <div style={{ alignContent: 'center' }}>Logout?</div>
      </ModalPageHeader>
    }
  >
    <Div>
      <Button
        size="l"
        stretched
        onClick={() => {
          props.logOut();
          props.onClose();
        }}
      >Logout</Button>
    </Div>
  </ModalPage>)
