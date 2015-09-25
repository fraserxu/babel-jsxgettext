import styles from './Header.css'

import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

import { gettext } from '../utils/translation'

export default class Header extends Component {

  static propTypes = {
    children: PropTypes.any
  }

  static contextTypes = {
    store: PropTypes.any
  }

  constructor (props, context) {
    super(props, context)
  }

  render () {
    return (
      <header className={styles.header}>
        <h1 className={styles.h1}>{ gettext('中文测试') }</h1>

        <nav className={styles.nav}>
          <Link className={styles.menuItem} to='/locations'>{ gettext('设置') }</Link>
          <Link className={styles.menuItem} to='/export'>{ gettext('导出') }</Link>
          <Link className={styles.menuItem} to='/'>{ gettext('浏览') }</Link>
        </nav>
      </header>
    )
  }

}
