import PropTypes from 'prop-types';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4', 
    fontFamily: 'Times-Roman'
  },
  title: {
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 5
  },
  evenRow: {
    backgroundColor: '#F0F0F1'
  },
  oddRow: {
    backgroundColor: '#FFFFFF'
  },
  rowData: {
    flexDirection: 'row',
    padding: 5,
    marginBottom: 5,
    fontSize: 12
  },
  cell: {
    width: '50%',
    paddingLeft: 5,
  }, 

});

const PdfGenerator = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Student List</Text>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <Text style={styles.cell}>ID</Text>
          <Text style={styles.cell}>Registration Number</Text>
          <Text style={styles.cell}>Student Name</Text>
        </View>

        {/* Data Rows */}
        {data.map((item, index) => (
          <View key={index} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
            <View style={styles.rowData}>
              <Text style={styles.cell}>{index + 1}</Text>
              <Text style={styles.cell}>{item.RegNo}</Text>
              <Text style={styles.cell}>{item.StudentName}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

PdfGenerator.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      RegNo: PropTypes.string.isRequired,
      StudentName: PropTypes.string.isRequired
    })
  ).isRequired
};

export default PdfGenerator;
