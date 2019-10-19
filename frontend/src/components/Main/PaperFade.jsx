import React, { Suspense } from 'react';
import BaseContainer from 'containers/BaseContainer';
import { Fade, Paper } from '@material-ui/core';
import LoadingCircle from 'components/Progress/LoadingCircle'

class PaperFade extends BaseContainer {
  constructor(props) {
    super(props)
    this.state = {
      in: false
    }
  }

  componentDidMount() {
    /**
     * sử dụng setTimeout để render view loading trước khi thật, để tránh bị lag view
     */
    this.timer = setTimeout(() => {
      this.setState({
        in: true
      })
    }, 1)
  }
  componentWillUnmount () {
    clearTimeout(this.timer)
  }

  renderLoading() {
    const { showLoading } = this.props
    return (
      <div style={{ height: "calc(100vh - 112px)", position: "relative" }}>
        <LoadingCircle
          show={showLoading}
        />
      </div>
    )
  }

  /**
   * Sử dụng load view loading trước,
   * sau đó mới load component bằng lazy() của React để tăng độ mượt cho view
   */
  renderComponent() {
    if (!this.state.in) return this.renderLoading()
    let { children } = this.props
    return (
      <Suspense fallback={this.renderLoading()}>
        <Fade in={this.state.in} timeout={500}>
          <div>
            {children}
          </div>
        </Fade>
      </Suspense>
    )
  }
  /**
   * Tạo 1 paper trống và hiển thị loading nếu có props showLoading = true
   */
  render() {
    let { children, showLoading, ...otherProps } = this.props
    return (
      <Paper
        {...otherProps}
      >
        {this.renderComponent()}
      </Paper>
    );
  }
}

export default PaperFade