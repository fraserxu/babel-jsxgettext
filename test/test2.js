/* global electronRequire */
var remoteRequire = electronRequire('remote')
var dialog = remoteRequire.require('dialog')
var path = remoteRequire.require('path')
var process = remoteRequire.require('process')
var cwd = process.cwd()

import styles from './Main.css'

import React, {
  Component,
  PropTypes,
  findDOMNode
} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { gettext } from '../../utils/translation'
import * as actions from '../../actions'
import { renameFile } from '../../utils/file-processor'

@connect(state => ({
  isFetchingFiles: state.application.isFetchingFiles,
  files: state.application.files,
  renamedFiles: state.application.renamedFiles,

  selectedTownship: state.application.township,

  isFetchingElections: state.locations.isFetchingElections,
  elections: state.locations.elections,
  isFetchingTownships: state.locations.isFetchingTownships,
  townships: state.locations.townships,
  isFetchingTracts: state.locations.isFetchingTracts,
  tracts: state.locations.tracts
}), dispatch => {
  return ({
    actions: bindActionCreators(actions, dispatch)
  })
})
export default class Main extends Component {

  static propTypes = {
    isFetchingFiles: PropTypes.any,
    files: PropTypes.array,
    renamedFiles: PropTypes.array,

    isFetchingElections: PropTypes.any,
    elections: PropTypes.any,
    actions: PropTypes.any,
    history: PropTypes.any,
    location: PropTypes.any,

    selectedTownship: PropTypes.any,

    isFetchingTownships: PropTypes.any,
    townships: PropTypes.array,
    isFetchingTracts: PropTypes.any,
    tracts: PropTypes.any
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      currentMeyo: null,
      isMeyoValid: true,
      formType: null,
      pageNumber: null,
      tract: null,
      election: null,
      rotate: 0
    }
  }

  componentWillMount () {
    const { actions, townships, isFetchingTownships, selectedTownship } = this.props

    actions.fetchFiles()

    if (!isFetchingTownships) {
      actions.fetchTract(this.findTownshipById(townships, selectedTownship).pcode)
    }
  }

  render () {
    const {
      isFetchingFiles,
      files,
      renamedFiles,
      isFetchingTownships,
      townships,
      selectedTownship,

      isFetchingElections,
      elections,

      isFetchingTracts,
      tracts
    } = this.props

    const {
      currentMeyo,
      isMeyoValid,
      formType,
      pageNumber,
      tract,
      election,
      rotate
    } = this.state

    const formTypes = [
      { id: 'Form16', name: 'Form16' },
      { id: 'Form16A', name: 'Form16A' },
      { id: 'Form18', name: 'Form18' },
      { id: 'Form18A', name: 'Form18A' },
      { id: 'Form19', name: 'Form19' },
      { id: 'Form19A', name: 'Form19A' }
    ]

    let validName = false
    if (selectedTownship && tract && formType && election && pageNumber) {
      // only valid meyo when is form 16 and form 16a
      if (formType === 'Form16' || formType === 'Form16A') {
        if (isMeyoValid) {
          validName = true
        }
      } else {
        validName = true
      }
    }

    return (
      <section className={styles.main}>
        <section className={styles.viewer}>
          <div className={styles.middle}>
            { !isFetchingFiles && files.length > 0 &&
              <img className={styles.img} style={{ 'transform': `rotate(${rotate || 0}deg)` }} src={files[0]} />
            }
            { files && files.length === 0 &&
              <div className={styles.noImg}>{ gettext('No files found. Please try to ') }
                <span className={styles.refresh} onClick={::this.refresh}>{ gettext('Refresh') }</span>
              </div>
            }
          </div>
          <div className={styles.bottom}>
            <span className={styles.refresh} onClick={::this.refresh}>{ gettext('Refresh') }</span>
            <span className={styles.refresh} onClick={::this.rotate}>{ gettext('Rotate') }</span>
            { gettext('Files renamed:') } <span className={styles.number}>{!isFetchingFiles ? renamedFiles.length : ''}</span>
            { gettext('Files left:') } <span className={styles.number}>{!isFetchingFiles ? files.length : ''}</span>
          </div>
        </section>

        <form className={styles.form} onSubmit={::this.handleSubmit}>

          { !isFetchingTownships &&
            <div className={styles.item}>
              <label className={styles.label} htmlFor='township'>{ gettext('Township') }</label>
              <input defaultValue={this.findTownshipById(townships, selectedTownship).name_my || ''} className={styles.input} ref='township' type='text' disabled />
            </div>
          }

          <div className={styles.item}>
            <label className={styles.label} htmlFor='tract'>{ gettext('Tract') }</label>
            <select defaultValue={tract} onChange={::this.onTractChange} className={styles.input}>
              <option selected disabled>{ gettext('Select Tract') }</option>
              { !isFetchingTracts &&
                tracts
                  .map((tract) => {
                    return <option key={tract.id} value={tract.id}>{tract.name}</option>
                  })
              }
            </select>
          </div>

          <div className={styles.item}>
            <label className={styles.label} htmlFor='tract'>{ gettext('Form Type') }</label>
            <select value={formType} onChange={::this.onFormTypeChange} className={styles.input}>
              <option selected disabled>{ gettext('Select Form Type') }</option>
              {
                formTypes
                .map((formType) => {
                  return <option key={formType.id} value={formType.id}>{formType.name}</option>
                })
              }
            </select>

          </div>

          { formType && (formType === 'Form16' || formType === 'Form16A') &&
            <div className={styles.meyo}>
              <label className={styles.meyoLable} htmlFor='meyo'>{ gettext('Meyo') }</label>
              <input className={styles.input} ref='meyoField' defaultValue={currentMeyo} type='text' onChange={::this.onMeyoChange} />
              <input className={styles.input} ref='meyoConfirmField' defaultValue={currentMeyo} type='text' onChange={::this.onMeyoCheckChange} />

              { !isMeyoValid &&
                <i className={styles.warning}>{ gettext('Meyo Name is not equal.') }</i>
              }
            </div>
          }

          <div className={styles.item}>
            <label className={styles.label} htmlFor='electron'>{ gettext('Election Code') }</label>
            <select value={election} onChange={::this.onElectionChange} className={styles.input}>
              <option selected disabled>{ gettext('Select Election') }</option>
              { !isFetchingElections &&
                elections
                  .map((election) => {
                    return <option key={election.id} value={election.id}>{election.name_en}</option>
                  })
              }
            </select>
          </div>

          <div className={styles.item}>
            <label className={styles.label} htmlFor='electron'>{ gettext('Page') }</label>
            <select value={pageNumber} onChange={::this.onPageChange} className={styles.input}>
              <option selected disabled>{ gettext('Select Page') }</option>
                {
                  [1, 2, 3]
                  .map((page) => {
                    return <option key={page} value={page}>{page}</option>
                  })
                }
            </select>
          </div>

          { !isFetchingTownships &&
            <div className={styles.action}>
              <span className={styles.preview}>{ gettext('New file name: ') } { `${!isFetchingTownships ? this.findTownshipById(townships, selectedTownship).pcode : ''}_${tract || ''}_${currentMeyo && currentMeyo.length > 0 ? currentMeyo.replace(/ /g, '-').replace(/_/g, '-') : ''}_${formType || ''}_${elections && election ? this.findElectionById(elections, election).pcode : ''}_Page${pageNumber || ''}.png` }</span>
              <button disabled={!validName} className={styles.submit} type='submit'>{ gettext('Rename') }</button>
            </div>
          }
        </form>
      </section>
    )
  }

  refresh () {
    const { actions } = this.props
    setImmediate(() => actions.fetchFiles())
  }

  rotate () {
    this.setState({
      rotate: this.state.rotate === 0 ? 180 : 0
    })
  }

  onTractChange (e) {
    this.setState({
      tract: e.target.value
    })
  }

  onFormTypeChange (e) {
    this.setState({
      formType: e.target.value
    })
  }

  onElectionChange (e) {
    this.setState({
      election: e.target.value
    })
  }

  onPageChange (e) {
    this.setState({
      pageNumber: e.target.value
    })
  }

  onMeyoChange (e) {
    let meyoConfirmFieldValue = findDOMNode(this.refs.meyoConfirmField).value
    if (!e.target.value || !meyoConfirmFieldValue) return

    if (meyoConfirmFieldValue === e.target.value) {
      this.setState({
        currentMeyo: e.target.value,
        isMeyoValid: true
      })
    } else {
      this.setState({
        isMeyoValid: false
      })
    }
  }

  onMeyoCheckChange (e) {
    let meyoFieldValue = findDOMNode(this.refs.meyoField).value
    if (!e.target.value || !meyoFieldValue) return

    if (e.target.value !== meyoFieldValue) {
      this.setState({
        isMeyoValid: false
      })
    } else {
      this.setState({
        currentMeyo: meyoFieldValue,
        isMeyoValid: true
      })
    }
  }

  findTownshipById (townships, id) {
    return townships.filter((township) => {
      return parseInt(township.id, 10) === parseInt(id, 10)
    })[0]
  }

  findElectionById (elections, id) {
    return elections.filter((election) => {
      return parseInt(election.id, 10) === parseInt(id, 10)
    })[0]
  }

  goNext () {
    const { actions } = this.props
    this.setState({
      pageNumber: parseInt(this.state.pageNumber, 10) > 2 ? 1 : parseInt(this.state.pageNumber, 10) + 1
    })
    actions.fetchFiles()
  }

  handleSubmit (evt) {
    evt.preventDefault()
    const {
      selectedTownship,
      files,
      townships,
      elections
    } = this.props

    const {
      tract,
      formType,
      currentMeyo,
      election,
      pageNumber
    } = this.state

    if (!selectedTownship || !tract || !formType || !election || !pageNumber) return

    const currentFile = files[0]
    let fileName = `${this.findTownshipById(townships, selectedTownship).pcode}_${tract || ''}_${currentMeyo && currentMeyo.length > 0 ? currentMeyo.replace(/ /g, '-').replace(/_/g, '-') : ''}_${formType || ''}_${this.findElectionById(elections, election).pcode || ''}_Page${pageNumber || ''}`

    renameFile(currentFile, fileName, (err) => {
      if (err && err.code === 'EEXIST') {
        dialog.showMessageBox({
          'type': 'warning',
          'title': 'Warning',
          'icon': path.join(cwd, './assets/images/logo.png'),
          'detail': gettext('If "Continue" is clicked, we will append "_corrected" to the end of the filename.'),
          'buttons': [gettext('Continue'), gettext('Cancel')],
          'message': gettext('Filename already exists, you can click “Continue” to add it or “Cancel” to find another name.')
        }, (res) => {
          // user click continue
          if (res === 0) {
            let newFileName = fileName + '_corrected'
            console.log('newFileName', newFileName)
            renameFile(currentFile, newFileName, (err) => {
              if (err) throw err
              this.goNext()
            })
          } else if (res === 1) {
            return
          }
        })
      } else {
        this.goNext()
      }
    })
  }
}
