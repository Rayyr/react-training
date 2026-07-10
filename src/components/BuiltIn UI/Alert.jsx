import React from "react"

const cn = (...classes) => classes.filter(Boolean).join(" ")

const alertBaseStyle = {
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: "4px 10px",
  width: "min(100%, 520px)",
  margin: "40px auto",
  padding: "14px 16px",
  borderRadius: "10px",
  border: "1px solid #f3a6b8",
  background: "#fff5f7",
  color: "#9f1239",
  textAlign: "left",
}

function Alert({ className, variant, ...props }) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(className)}
      style={alertBaseStyle}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }) {
  return (
    <div
      data-slot="alert-title"
      className={cn(className)}
      style={{ fontWeight: 700 }}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }) {
  return (
    <div
      data-slot="alert-description"
      className={cn(className)}
      style={{ gridColumn: "2", fontSize: "0.95rem" }}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }) {
  return (
    <div
      data-slot="alert-action"
      className={cn(className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
