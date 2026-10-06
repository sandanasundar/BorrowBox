import React from 'react';

function ItemForm({ formData, onChange, onSubmit, isEditing = false, buttonText = 'Submit Item' }) {
  return (
    <form onSubmit={onSubmit} className="card">
      <div className="form-group">
        <label className="form-label">Item Name *</label>
        <input
          type="text"
          name="itemName"
          className="form-input"
          placeholder="e.g. Scientific Calculator, Engineering Drafter"
          value={formData.itemName}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Category *</label>
          <select
            name="category"
            className="form-select"
            value={formData.category}
            onChange={onChange}
            required
          >
            <option value="Study">Study</option>
            <option value="Books">Books</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="Sports">Sports</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Condition *</label>
          <select
            name="condition"
            className="form-select"
            value={formData.condition}
            onChange={onChange}
            required
          >
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Description *</label>
        <textarea
          name="description"
          rows="3"
          className="form-textarea"
          placeholder="Provide details about item model, condition, or usage instructions..."
          value={formData.description}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-row-3">
        <div className="form-group">
          <label className="form-label">Student / Lender Name *</label>
          <input
            type="text"
            name="ownerName"
            className="form-input"
            placeholder="e.g. Sandana"
            value={formData.ownerName}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Department *</label>
          <input
            type="text"
            name="ownerDepartment"
            className="form-input"
            placeholder="e.g. CSE, ECE, Mech"
            value={formData.ownerDepartment}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Academic Year *</label>
          <select
            name="ownerYear"
            className="form-select"
            value={formData.ownerYear}
            onChange={onChange}
            required
          >
            <option value="I">I Year</option>
            <option value="II">II Year</option>
            <option value="III">III Year</option>
            <option value="IV">IV Year</option>
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
        {buttonText}
      </button>
    </form>
  );
}

export default ItemForm;
