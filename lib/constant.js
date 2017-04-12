exports.DEFAULT_FUNCTION_NAMES = {
  gettext: ['msgid'],
  dgettext: ['domain', 'msgid'],
  ngettext: ['msgid', 'msgid_plural', 'count'],
  dngettext: ['domain', 'msgid', 'msgid_plural', 'count'],
  pgettext: ['msgctxt', 'msgid'],
  dpgettext: ['domain', 'msgctxt', 'msgid'],
  npgettext: ['msgctxt', 'msgid', 'msgid_plural', 'count'],
  dnpgettext: ['domain', 'msgctxt', 'msgid', 'msgid_plural', 'count']
}

exports.DEFAULT_HEADERS = {
  'project-id-version': 'PACKAGE VERSION',
  'language-team': 'LANGUAGE <LL@li.org>',
  'po-revision-date': 'YEAR-MO-DA HO:MI+ZONE',
  'language': '',
  'mime-version': '1.0',
  'content-type': 'text/plain; charset=UTF-8',
  'content-transfer-encoding': '8bit',
  'plural-forms': 'nplurals = 2; plural = (n !== 1);'
}
