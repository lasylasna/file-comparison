import React from 'react';

class CsvDownloader extends React.Component {
  downloadCsv = () => {
    const { dataArray, fileName } = this.props;

    const csvData = dataArray.map(obj => Object.values(obj).join(',')).join('\n');
    const csvBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(csvBlob);
    downloadLink.download = fileName;
    downloadLink.click();
  };

  downloadText=()=>{
    const { dataArray, fileName } = this.props;
    const text =dataArray.map(obj => Object.values(obj).join('  ')).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Data.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    window.location.reload();
  }

  render() {
    return (
      <button  className="button-71" role="button"  onClick={this.downloadText}>
        Click to Download
      </button>
    );
  }
}

export default CsvDownloader;
