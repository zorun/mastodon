import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StatusListContainer from '../ui/containers/status_list_container';
import Column from '../ui/components/column';
import {
  refreshTimeline,
  updateTimeline,
  deleteFromTimelines,
  connectTimeline,
  disconnectTimeline
} from '../../actions/timelines';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import ColumnBackButtonSlim from '../../components/column_back_button_slim';

const messages = defineMessages({
  title: { id: 'column.remote', defaultMessage: 'Remote timeline' }
});

const mapStateToProps = state => ({
  hasUnread: state.getIn(['timelines', 'remote', 'unread']) > 0,
});

class RemoteTimeline extends React.PureComponent {

  componentDidMount () {
    const { dispatch } = this.props;

    dispatch(refreshTimeline('remote'));

  }

  componentWillUnmount () {
  }

  render () {
    const { intl, hasUnread } = this.props;

    return (
      <Column icon='globe' active={hasUnread} heading={intl.formatMessage(messages.title)}>
        <ColumnBackButtonSlim />
        <StatusListContainer {...this.props} type='remote' scrollKey='remote_timeline' emptyMessage={<FormattedMessage id='empty_column.remote' defaultMessage='There is nothing here! Wait for users from the remote instance to write something...' />} />
      </Column>
    );
  }

}

RemoteTimeline.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  hasUnread: PropTypes.bool
};

export default connect(mapStateToProps)(injectIntl(RemoteTimeline));
