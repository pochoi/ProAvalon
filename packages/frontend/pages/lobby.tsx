import { ReactElement } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import Link from 'next/link';

import { RootState } from '../store/index';
import { ThemeOptions, IUserOptionsState } from '../store/userOptions/types';
import { MobileView, ISystemState } from '../store/system/types';

import Nav from '../components/nav';
import OnlinePlayers from '../components/lobby/onlinePlayers';
import Taako from '../components/lobby/taako';
import Chat, { dateGenObj } from '../components/lobby/chat';
import GamesMenu from '../components/lobby/gamesMenu/gamesMenu';
import Announcements from '../components/lobby/announcements';

interface IProps {
  theme: ThemeOptions;
  mobileView: MobileView;
}

const Lobby = ({ theme, mobileView }: IProps): ReactElement => {
  console.log('mobileView', mobileView);

  return (
    <div className="container">
      <title>Lobby</title>
      <Grid divided="vertically" padded className="main_grid">
        <Grid.Column width={4}>
          <Grid.Row className="logo_wrapper">
            <Link href="/">
              <a>
                <img src="/common/logo.png" alt="logo" className="logo" />
              </a>
            </Link>
          </Grid.Row>
          <Grid.Row className="taako_wrapper">
            <Taako />
          </Grid.Row>
          <Grid.Row>
            <Announcements
              announcements={[
                {id: '1', timestamp: new Date(dateGenObj.next().value as number), link: "/announcements/123", text: "New Patreon rewards!"},
                {id: '2', timestamp: new Date(dateGenObj.next().value as number), link: "/announcements/123", text: "Morgana cannot lie anymore!"},
                {id: '3', timestamp: new Date(dateGenObj.next().value as number), link: "/announcements/123", text: "Players will now be allowed to wear bows"},
              ]}
            />
          </Grid.Row>
          <Grid.Row>
            <OnlinePlayers
              players={[
                { username: 'ProNub' },
                { username: 'Skies' },
                { username: 'Pam' },
                { username: 'Pam2' },
                { username: 'Pam3' },
                { username: 'Pam4' },
                { username: 'Pam5' },
                { username: 'Pam6' },
                { username: 'Pam7' },
                { username: 'Pam8' },
                { username: 'Pam9' },
              ]}
              maxHeight="350px"
            />
          </Grid.Row>
        </Grid.Column>

        <Grid.Column width={12} className="center">
          <Grid.Row className="navbar">
            <Nav />
          </Grid.Row>
          <Grid.Row style={{ flex: 1 }}>
            <Grid className="chat_games">
              <Grid.Column width={11}>
                <Chat />
              </Grid.Column>
              <Grid.Column width={5}>
                <GamesMenu />
              </Grid.Column>
            </Grid>
          </Grid.Row>
        </Grid.Column>
      </Grid>

      <style jsx>
        {`
          .container {
            padding: 30px;
            background-color: ${theme.colors.BACKGROUND};
            z-index: -1;
            color: ${theme.colors.TEXT};
          }

          .ui.grid {
            margin-top: 0;
          }

          .logo {
            max-width: 200px;
            width: 100%;
          }
        `}
      </style>
      <style global jsx>
        {`
          // CSS to make NextJS Page one page tall
          html,
          body,
          body > div:first-child,
          div#__next,
          div#__next > div {
            height: 100%;
          }

          body {
            margin: 0px;
          }

          .main_grid {
            height: 100%;
          }

          .container .center {
            display: flex !important;
            flex-direction: column;
          }

          .container .logo_wrapper {
            text-align: center;
          }

          .container .chat_games {
            height: 100%;
          }

          .ui.grid {
            margin: 0;
          }
        `}
      </style>
    </div>
  );
};

const mapStateToProps = (
  state: RootState,
): Pick<IUserOptionsState & ISystemState, 'theme' | 'mobileView'> => ({
  theme: state.userOptions.theme,
  mobileView: state.system.mobileView,
});

export default connect(mapStateToProps, null)(Lobby);